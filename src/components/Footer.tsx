import React from 'react'
import { useTranslation } from "react-i18next";


const Footer = () => {
     const { t } = useTranslation();

  const footerLinks = [
    {
      title: t("footer.product.title"),
      links: [
        t("footer.product.features"),
        t("footer.product.dashboard"),
        t("footer.product.analytics"),
        t("footer.product.contacts"),
      ],
    },
    {
      title: t("footer.company.title"),
      links: [
        t("footer.company.about"),
        t("footer.company.blog"),
        t("footer.company.careers"),
        t("footer.company.press"),
      ],
    },
    {
      title: t("footer.support.title"),
      links: [
        t("footer.support.docs"),
        t("footer.support.help"),
        t("footer.support.contact"),
        t("footer.support.status"),
      ],
    },
  ];
  return (
    <>
     <footer className="bg-[#f1f5fb] px-6 pb-16 pt-28 md:px-10">
      <div className="mx-auto max-w-[1760px]">

   
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

 
          <div>
            <h2 className="mb-9 text-[28px] font-extrabold tracking-tight text-[#191e36]">
              Adl 5:8
            </h2>

          <p className="max-w-[380px] text-[18px] leading-[1.9] text-[#a2a9b8]">
  {t("footer.description")}
</p>
          </div>

       
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="mb-8 text-[16px] font-bold tracking-[0.15em] text-[#858c9d]">
                {column.title}
              </h3>

              <ul className="flex flex-col gap-6">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-[18px] text-[#9299aa] transition-colors hover:text-[#437eff]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

     
        <div className="mt-24 border-t border-[#dfe5ee]" />

     
        <div className="mt-9 flex flex-col justify-between gap-6 md:flex-row md:items-center">

         <p className="text-[16px] text-[#b0b7c5]">
  © 2026 DebtBook. {t("footer.copyright")}
</p>
          <div className="flex flex-wrap gap-8">
            {[
              "Конфиденциальность",
              "Условия",
              "Cookies",
            ].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[16px] text-[#a8b0bf] transition-colors hover:text-[#437eff]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer