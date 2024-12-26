import Link from 'next/link';

import { getImageUrl } from '@/lib/utils';

import Loader from '@/components/shared/loaders/Loader';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/utilities/avatar';
import { TooltipWrapper } from '@/components/ui/info/tooltip-wrapper';

type NavbarAvatarProps = {
  tooltip: string;
  href: string;
  imageUrl: string;
};

const NavbarAvatar: React.FC<NavbarAvatarProps> = ({
  tooltip,
  href,
  imageUrl,
}) => {
  const formattedImageUrl = getImageUrl(imageUrl);

  return (
    <TooltipWrapper tooltip={tooltip}>
      <Link href={href}>
        <Avatar>
          <AvatarImage className="object-cover" src={formattedImageUrl} />
          <AvatarFallback>
            <Loader type="ScaleLoader" height={10} />
          </AvatarFallback>
        </Avatar>
      </Link>
    </TooltipWrapper>
  );
};

export default NavbarAvatar;
