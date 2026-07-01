import type { ComponentProps } from "react";

type PaymentLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

/** Native checkout link — avoids Next.js client routing issues on mobile. */
export default function PaymentLink({ href, className, children, ...rest }: PaymentLinkProps) {
  return (
    <a href={href} className={className} rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
