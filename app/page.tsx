import { get } from '@vercel/edge-config';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from './icons';

export const dynamic = 'force-dynamic',
  runtime = 'edge';

function LinkCard({
  href,
  title,
  icons,
  color
}: {
  href: string;
  title: string;
  icons?: string;
  color?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-1 w-full rounded-md hover:scale-105 transition-all bg-white/30 backdrop-opacity-5 backdrop-invert mb-3 max-w-3xl"
    >
      <li className="flex text-center w-full">
        <div className={`flex justify-center items-center w-10 h-10`}>
          {icons && (
            <Image
              className="rounded-sm"
              alt={title}
              src={icons}
              width={30}
              height={30}
            />
          )}
        </div>
        <h2 className="flex justify-center items-center font-semibold w-full text-black -ml-10">
          {title}
        </h2>
      </li>
    </a>
  );
}

interface Data {
  name: string;
  avatar: string;
  links: Link[];
  socials: Social[];
}

interface Link {
  href: string;
  title: string;
  icon?: string;
}

interface Social {
  title: string;
  href: string;
  icons: string;
  color?: string;
}

export default async function HomePage() {
  const data: Data | undefined = await get('njmbio');

  if (!data) {
    // not working yet https://github.com/vercel/next.js/issues/44232
    redirect('https://njmbio.vercel.app/');
  }

  return (
    <main className="flex items-center flex-col mx-auto w-full justify-center mt-16 px-8">
      <Image
        priority
        className="rounded-full"
        alt={data.name}
        src={data.avatar}
        width={96}
        height={96}
      />
      <h1 className="font-bold mt-4 mb-8 text-xl text-white">{data.name}</h1>

      <p className="text-white mb-7">Links to my social media and services I offer.</p>

      {data.links.map((link) => (
        <LinkCard key={link.href} {...link} />
      ))}

      <div className="flex items-center gap-4 mt-8 text-white">
        {data.socials.map((social) => (
          <a
            aria-label={`${social.title} link`}
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-mint text-mint fill-current">
              {social.href.includes('twitter') ? (
                <TwitterIcon /*color={social.color}*/ />
              ) : social.href.includes('github') ? (
                <GitHubIcon /*color={social.color}*/ />
              ) : social.href.includes('instagram') ? (
                <InstagramIcon /*color={social.color}*/ />
              ) : social.href.includes('linkedin') ? (
                <LinkedInIcon /*color={social.color}*/ />
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
