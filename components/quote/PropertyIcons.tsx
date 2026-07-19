type IconProps = {
  className?: string;
};

export function HouseIcon({
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 19.5L21 7L36 19.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10 17V35H32V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M17 35V25H25V35"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function ApartmentIcon({
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="9"
        y="5"
        width="24"
        height="32"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M15 11H18M24 11H27M15 17H18M24 17H27M15 23H18M24 23H27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M17 37V30H25V37"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CommercialIcon({
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 16H36L33 8H9L6 16Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M8 16V35H34V16"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M15 35V25H27V35"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M6 16C7.5 19 11 19 12.5 16C14 19 17.5 19 19 16C20.5 19 24 19 25.5 16C27 19 30.5 19 32 16C33.5 19 35 18 36 16"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function HotelIcon({
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 35V12H35V35"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M13 18H17M25 18H29M13 24H17M25 24H29"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M17 35V29H25V35"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M12 12V7H30V12"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}