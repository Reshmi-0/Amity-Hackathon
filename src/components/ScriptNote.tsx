import React from 'react';

interface ScriptNoteProps {
  text: string;
  heart?: boolean;
  className?: string;
  rotation?: string;
}

export const ScriptNote: React.FC<ScriptNoteProps> = ({
  text,
  heart = true,
  className = '',
  rotation = '-rotate-3',
}) => {
  return (
    <div
      className={`font-script text-2xl sm:text-3xl text-[#5B7BFA] select-none tracking-wide ${rotation} ${className}`}
      style={{ textShadow: '0 2px 10px rgba(91, 123, 250, 0.15)' }}
    >
      <span>{text}</span>
      {heart && <span className="ml-1.5 text-rose-400 inline-block transition-transform hover:scale-125">♡</span>}
    </div>
  );
};
