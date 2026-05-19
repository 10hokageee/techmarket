import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const CustomSelect: React.FC<Props> = ({
  options,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLabel =
    options.find(option => option.value === value)?.label || '';

  return (
    <div className="border-2 relative w-1/1 font-poppins font-semibold max-w-[179px] xl:max-w-[185px] cursor-pointer">
      <div className='relative' ref={wrapperRef}>
        <div
          className="py-[11px] pl-[15px] pr-[42px] text-[11px]/[16px] xl:text-[13px]/[210%] xl:pr-[30px]"
          onClick={() => setOpen(prev => !prev)}
        >
          Sort by position ({selectedLabel})

          <ChevronDown width="16px" height="16px" className="absolute right-2.5 top-[50%] transform translate-y-[-50%]" />
        </div>

        {open && (
          <ul className="absolute top-[50px] left-[-1px] max-w-44.75 w-[179px] border-[2px] z-10 max-h-36 overflow-y-auto px-[8px] bg-white p-0 xl:w-[185px] xl:top-[55px]">
            {options.map(option => (
              <li
                key={option.value}
                className="px-[12px] py-[6px] text-[11px]/[16px]"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
