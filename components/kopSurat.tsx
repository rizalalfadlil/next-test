import React from "react";

export default function KopSurat() {
  return (
    <>
      <div className="flex items-center">
        <div
          className="size-20 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://raw.githubusercontent.com/rizalalfadlil/next-test/master/public/logo.png')`,
          }}
        ></div>
        <div>
          <p className="text-4xl text-nowrap font-bold">Bisa Ngopi</p>
          <p className="mt-1 hidden md:block">Jl. Cigending No.3, Cigending, Kec. Ujung Berung, Kota Bandung, Jawa Barat 40611</p>
        </div>
      </div>
      <hr className="border-2 border-primary my-4" />
    </>
  );
}
