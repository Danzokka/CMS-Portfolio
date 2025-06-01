import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="h-full">
      <body>
        <div className="w-full h-full min-h-[calc(100vh-6rem)] flex items-center justify-center bg-[url('/blobs/waves.svg')] bg-no-repeat bg-cover bg-center">
          {children}
        </div>
      </body>
    </html>
  );
};

export default layout;
