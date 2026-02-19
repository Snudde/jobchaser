interface FooterProps {
  description: string;
}

export default function Footer({ description }: FooterProps) {
  return (
    <footer className="footer w-full flex justify-center bg-blue-950 items-center">
      <div className="flex flex-col items-center p-5">
        <p className="description">{description}</p>
      </div>
    </footer>
  );
}
