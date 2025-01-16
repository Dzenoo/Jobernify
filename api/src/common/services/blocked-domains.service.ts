import * as exactDomains from 'disposable-email-domains/index.json';

import * as wildcardDomains from 'disposable-email-domains/wildcard.json';

import { Injectable } from '@nestjs/common';

@Injectable()
export class BlockedDomainsService {
  private readonly exactDomainSet: Set<string>;
  private readonly wildcardList: string[];

  constructor() {
    // Optionally add your own custom exact domains here
    const customExactDomains: string[] = ['fileexp.com'];

    // Optionally add your own wildcard patterns here
    // For example: "*.abc-disposables.com"
    const customWildcardDomains: string[] = [];

    // 1) Combine built-in exact domains with your own
    //    Lowercase them for consistent comparisons
    this.exactDomainSet = new Set([
      ...exactDomains.map((d) => d.toLowerCase()),
      ...customExactDomains.map((d) => d.toLowerCase()),
    ]);

    // 2) Combine built-in wildcard patterns with your own
    //    Keep them in an array; you'll do a subdomain check against each.
    this.wildcardList = [...wildcardDomains, ...customWildcardDomains].map(
      (d) => d.toLowerCase(),
    );
  }

  /**
   * Main method to check if a domain is blocked.
   */
  public isDomainBlocked(domain: string): boolean {
    const normalizedDomain = domain.toLowerCase();

    // 1) Exact match check
    if (this.exactDomainSet.has(normalizedDomain)) {
      return true;
    }

    // 2) Wildcard checks
    //    The wildcard format is typically "*.33mail.com", so let's parse them:
    for (const wildcard of this.wildcardList) {
      // For example, "wildcard" might be "*.33mail.com"
      //  - We want to see if "domain" ends with "33mail.com"
      //  - Or if domain is exactly "33mail.com"
      const trimmed = wildcard.replace(/^\*\./, ''); // remove the "*." prefix

      // If the domain is exactly the base or if it ends with ".base"
      // e.g. domain: "abc.33mail.com" => ends with ".33mail.com"
      //      domain: "33mail.com" => equals "33mail.com"
      if (
        normalizedDomain === trimmed ||
        normalizedDomain.endsWith(`.${trimmed}`)
      ) {
        return true;
      }
    }

    // 3) No match
    return false;
  }
}
