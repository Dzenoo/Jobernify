import {
  IndustryType,
  CompanySize,
  JobLevel,
  JobType,
  JobPosition,
} from '@jobernify/shared';

export const industries = Object.values(IndustryType) as [string, ...string[]];
export const companySizes = Object.values(CompanySize) as [string, ...string[]];
export const jobLevels = Object.values(JobLevel) as [string, ...string[]];
export const jobTypes = Object.values(JobType) as [string, ...string[]];
export const jobPositions = Object.values(JobPosition) as [string, ...string[]];

export const locations = [
  { label: 'Afghanistan', value: 'afg' },
  { label: 'Albania', value: 'alb' },
  { label: 'Algeria', value: 'dza' },
  { label: 'Andorra', value: 'and' },
  { label: 'Angola', value: 'ago' },
  { label: 'Antigua and Barbuda', value: 'atg' },
  { label: 'Argentina', value: 'arg' },
  { label: 'Armenia', value: 'arm' },
  { label: 'Australia', value: 'aus' },
  { label: 'Austria', value: 'aut' },
  { label: 'Azerbaijan', value: 'aze' },
  { label: 'Bahamas', value: 'bhs' },
  { label: 'Bahrain', value: 'bhr' },
  { label: 'Bangladesh', value: 'bgd' },
  { label: 'Barbados', value: 'brb' },
  { label: 'Belarus', value: 'blr' },
  { label: 'Belgium', value: 'bel' },
  { label: 'Belize', value: 'blz' },
  { label: 'Benin', value: 'ben' },
  { label: 'Bhutan', value: 'btn' },
  { label: 'Bolivia', value: 'bol' },
  { label: 'Bosnia and Herzegovina', value: 'bih' },
  { label: 'Botswana', value: 'bwa' },
  { label: 'Brazil', value: 'bra' },
  { label: 'Brunei', value: 'brn' },
  { label: 'Bulgaria', value: 'bgr' },
  { label: 'Burkina Faso', value: 'bfa' },
  { label: 'Burundi', value: 'bdi' },
  { label: 'Cabo Verde', value: 'cpv' },
  { label: 'Cambodia', value: 'khm' },
  { label: 'Cameroon', value: 'cmr' },
  { label: 'Canada', value: 'can' },
  { label: 'Central African Republic', value: 'caf' },
  { label: 'Chad', value: 'tcd' },
  { label: 'Chile', value: 'chl' },
  { label: 'China', value: 'chn' },
  { label: 'Colombia', value: 'col' },
  { label: 'Comoros', value: 'com' },
  { label: 'Congo (Congo-Brazzaville)', value: 'cog' },
  { label: 'Costa Rica', value: 'cri' },
  { label: 'Croatia', value: 'hrv' },
  { label: 'Cuba', value: 'cub' },
  { label: 'Cyprus', value: 'cyp' },
  { label: 'Czechia (Czech Republic)', value: 'cze' },
  { label: 'Democratic Republic of the Congo', value: 'cod' },
  { label: 'Denmark', value: 'dnk' },
  { label: 'Djibouti', value: 'dji' },
  { label: 'Dominica', value: 'dma' },
  { label: 'Dominican Republic', value: 'dom' },
  { label: 'Ecuador', value: 'ecu' },
  { label: 'Egypt', value: 'egy' },
  { label: 'El Salvador', value: 'slv' },
  { label: 'Equatorial Guinea', value: 'gnq' },
  { label: 'Eritrea', value: 'eri' },
  { label: 'Estonia', value: 'est' },
  { label: 'Eswatini', value: 'swz' },
  { label: 'Ethiopia', value: 'eth' },
  { label: 'Fiji', value: 'fji' },
  { label: 'Finland', value: 'fin' },
  { label: 'France', value: 'fra' },
  { label: 'Gabon', value: 'gab' },
  { label: 'Gambia', value: 'gmb' },
  { label: 'Georgia', value: 'geo' },
  { label: 'Germany', value: 'ger' },
  { label: 'Ghana', value: 'gha' },
  { label: 'Greece', value: 'grc' },
  { label: 'Grenada', value: 'grd' },
  { label: 'Guatemala', value: 'gtm' },
  { label: 'Guinea', value: 'gin' },
  { label: 'Guinea-Bissau', value: 'gnb' },
  { label: 'Guyana', value: 'guy' },
  { label: 'Haiti', value: 'hti' },
  { label: 'Honduras', value: 'hnd' },
  { label: 'Hungary', value: 'hun' },
  { label: 'Iceland', value: 'isl' },
  { label: 'India', value: 'ind' },
  { label: 'Indonesia', value: 'idn' },
  { label: 'Iran', value: 'irn' },
  { label: 'Iraq', value: 'irq' },
  { label: 'Ireland', value: 'irl' },
  { label: 'Italy', value: 'ita' },
  { label: 'Jamaica', value: 'jam' },
  { label: 'Japan', value: 'jpn' },
  { label: 'Jordan', value: 'jor' },
  { label: 'Kazakhstan', value: 'kaz' },
  { label: 'Kenya', value: 'ken' },
  { label: 'Kiribati', value: 'kir' },
  { label: 'Kuwait', value: 'kwt' },
  { label: 'Kyrgyzstan', value: 'kgz' },
  { label: 'Laos', value: 'lao' },
  { label: 'Latvia', value: 'lva' },
  { label: 'Lebanon', value: 'lbn' },
  { label: 'Lesotho', value: 'lso' },
  { label: 'Liberia', value: 'lbr' },
  { label: 'Libya', value: 'lby' },
  { label: 'Liechtenstein', value: 'lie' },
  { label: 'Lithuania', value: 'ltu' },
  { label: 'Luxembourg', value: 'lux' },
  { label: 'Madagascar', value: 'mdg' },
  { label: 'Malawi', value: 'mwi' },
  { label: 'Malaysia', value: 'mys' },
  { label: 'Maldives', value: 'mdv' },
  { label: 'Mali', value: 'mli' },
  { label: 'Malta', value: 'mlt' },
  { label: 'Marshall Islands', value: 'mhl' },
  { label: 'Mauritania', value: 'mrt' },
  { label: 'Mauritius', value: 'mus' },
  { label: 'Mexico', value: 'mex' },
  { label: 'Micronesia', value: 'fsm' },
  { label: 'Moldova', value: 'mda' },
  { label: 'Monaco', value: 'mco' },
  { label: 'Mongolia', value: 'mng' },
  { label: 'Montenegro', value: 'mne' },
  { label: 'Morocco', value: 'mar' },
  { label: 'Mozambique', value: 'moz' },
  { label: 'Myanmar (Burma)', value: 'mmr' },
  { label: 'Namibia', value: 'nam' },
  { label: 'Nauru', value: 'nru' },
  { label: 'Nepal', value: 'npl' },
  { label: 'Netherlands', value: 'nld' },
  { label: 'New Zealand', value: 'nzl' },
  { label: 'Nicaragua', value: 'nic' },
  { label: 'Niger', value: 'ner' },
  { label: 'Nigeria', value: 'nga' },
  { label: 'North Korea', value: 'prk' },
  { label: 'North Macedonia', value: 'mkd' },
  { label: 'Norway', value: 'nor' },
  { label: 'Oman', value: 'omn' },
  { label: 'Pakistan', value: 'pak' },
  { label: 'Palau', value: 'plw' },
  { label: 'Palestine', value: 'pse' },
  { label: 'Panama', value: 'pan' },
  { label: 'Papua New Guinea', value: 'png' },
  { label: 'Paraguay', value: 'pry' },
  { label: 'Peru', value: 'per' },
  { label: 'Philippines', value: 'phl' },
  { label: 'Poland', value: 'pol' },
  { label: 'Portugal', value: 'prt' },
  { label: 'Qatar', value: 'qat' },
  { label: 'Romania', value: 'rou' },
  { label: 'Russia', value: 'rus' },
  { label: 'Rwanda', value: 'rwa' },
  { label: 'Saint Kitts and Nevis', value: 'kna' },
  { label: 'Saint Lucia', value: 'lca' },
  { label: 'Saint Vincent and the Grenadines', value: 'vct' },
  { label: 'Samoa', value: 'wsm' },
  { label: 'San Marino', value: 'smr' },
  { label: 'Sao Tome and Principe', value: 'stp' },
  { label: 'Saudi Arabia', value: 'sau' },
  { label: 'Senegal', value: 'sen' },
  { label: 'Serbia', value: 'srb' },
  { label: 'Seychelles', value: 'syc' },
  { label: 'Sierra Leone', value: 'sle' },
  { label: 'Singapore', value: 'sgp' },
  { label: 'Slovakia', value: 'svk' },
  { label: 'Slovenia', value: 'svn' },
  { label: 'Solomon Islands', value: 'slb' },
  { label: 'Somalia', value: 'som' },
  { label: 'South Africa', value: 'zaf' },
  { label: 'South Korea', value: 'kor' },
  { label: 'South Sudan', value: 'ssd' },
  { label: 'Spain', value: 'spa' },
  { label: 'Sri Lanka', value: 'lka' },
  { label: 'Sudan', value: 'sdn' },
  { label: 'Suriname', value: 'sur' },
  { label: 'Sweden', value: 'swe' },
  { label: 'Switzerland', value: 'che' },
  { label: 'Syria', value: 'syr' },
  { label: 'Taiwan', value: 'twn' },
  { label: 'Tajikistan', value: 'tjk' },
  { label: 'Tanzania', value: 'tza' },
  { label: 'Thailand', value: 'tha' },
  { label: 'Timor-Leste', value: 'tls' },
  { label: 'Togo', value: 'tgo' },
  { label: 'Tonga', value: 'ton' },
  { label: 'Trinidad and Tobago', value: 'tto' },
  { label: 'Tunisia', value: 'tun' },
  { label: 'Turkiye', value: 'tur' },
  { label: 'Turkmenistan', value: 'tkm' },
  { label: 'Tuvalu', value: 'tuv' },
  { label: 'Uganda', value: 'uga' },
  { label: 'Ukraine', value: 'ukr' },
  { label: 'United Arab Emirates', value: 'are' },
  { label: 'United Kingdom', value: 'gbr' },
  { label: 'United States', value: 'usa' },
  { label: 'Uruguay', value: 'ury' },
  { label: 'Uzbekistan', value: 'uzb' },
  { label: 'Vanuatu', value: 'vut' },
  { label: 'Vatican City', value: 'vat' },
  { label: 'Venezuela', value: 'ven' },
  { label: 'Vietnam', value: 'vnm' },
  { label: 'Yemen', value: 'yem' },
  { label: 'Zambia', value: 'zmb' },
  { label: 'Zimbabwe', value: 'zwe' },
];
