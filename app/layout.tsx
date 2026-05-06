import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
    title: '연세척병원',
    description: '연세척병원 양방향 척추내시경',
    icons: {
        icon: '/images/pabicon.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className="font-sans">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(d) {
                                var config = {
                                    kitId: 'xne4mhw',
                                    scriptTimeout: 3000,
                                    async: true
                                },
                                h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
                            })(document);
                        `
                    }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P4DZPL3Z');`
                    }}
                />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-JB2HGB54DT" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-JB2HGB54DT');`
                    }}
                />
            </head>
            <body>
                <noscript>
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4DZPL3Z"
                        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
                </noscript>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
