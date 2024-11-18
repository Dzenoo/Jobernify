import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC<{ href?: string }> = ({ href = "/" }) => {
  const { theme } = useTheme();

  return (
    <Link href={href}>
      <Image
        className="sm:hidden"
        src={
          theme === "dark"
            ? "/images/logo-icon-dark.png"
            : "/images/logo-icon.png"
        }
        alt="logo"
        width={50}
        height={50}
        loading="lazy"
      />
      <Image
        className="max-sm:hidden"
        src={
          theme === "dark" ? "/images/logo-dark.png" : "/images/logo-light.png"
        }
        alt="logo"
        width={150}
        height={150}
        loading="lazy"
      />
    </Link>
  );
};
export default Logo;
