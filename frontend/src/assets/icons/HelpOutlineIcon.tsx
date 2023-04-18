import { FC } from 'react';

const HelpIconOutline: FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      width={size}
      height={size}
      style={{ maxWidth: 'unset' }}
    >
      <path
        d="M11.325 13.632a.65.65 0 101.3-.01c0-.3.04-.5.15-.78.14-.33.42-.63.72-.94l.004-.004c.489-.51 1.036-1.079 1.175-1.996.13-.87-.23-1.77-.95-2.34-.74-.59-1.72-.72-2.62-.37-1.18.47-1.85 1.49-1.79 2.75.01.36.33.63.68.62a.65.65 0 00.62-.68c-.03-.49.13-1.15.97-1.48.47-.18.95-.12 1.33.18.36.28.54.71.48 1.13-.078.502-.418.858-.81 1.269l-.02.021c-.36.37-.76.79-.99 1.36-.18.43-.25.8-.25 1.27zm1.525 2.718a.85.85 0 11-1.7 0 .85.85 0 011.7 0z"
        fill="#717681"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3a9 9 0 100 18 9 9 0 000-18zm-7.7 9a7.7 7.7 0 1115.4 0 7.7 7.7 0 01-15.4 0z"
        fill="#717681"
      ></path>
    </svg>
  );
};

export default HelpIconOutline;
