import { Quote } from "lucide-react";

export interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  initials: string;
  featured?: boolean;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  initials,
}: TestimonialCardProps) {
  return (
    <article
      className={`flex min-h-[300px] flex-col justify-between rounded-[12px] border p-6 md:p-8 border-gray-500/[0.2] bg-white dark:bg-[#101010]`}
    >
      <div>
        <Quote
          size={28}
          strokeWidth={1.5}
          className="text-secondary"
        />
        <p
          className={`mt-6 text-lg leading-7 opacity-80`}
        >
          {quote}
        </p>
      </div>

      <div className="mt-10 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold bg-primary/[0.08] text-primary dark:text-white`}
        >
          {initials}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className={`text-sm opacity-50`}>
            {role}
          </p>
        </div>
      </div>
    </article>
  );
}
