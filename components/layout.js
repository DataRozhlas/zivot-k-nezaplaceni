import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const menuItemStyle = { color: "#7C8A92" };
const activeMenuItemStyle = { fontWeight: "bold" };
const navbarItemStyle = {
    color: "#707070"
};
const navbarItemStylePadding = {
    ...navbarItemStyle,
    padding: "14px 16px"
};

function ActiveLink({ children, href, style, activeStyle }) {
    const router = useRouter()
    const isActive = router.pathname === href && router.pathname !== "/";
    return (<Link href={href}><a style={isActive ? activeStyle : style}>{children}</a></Link>);
}

export default function Layout(props) {
    const [openMenu, setOpenMenu] = useState(false);

    const menu = (
        <>
            <div style={{ marginTop: "4rem" }}>
                <h3>EKONOMICKÉ DOPADY</h3>
                <ul>
                    <li><ActiveLink href="/destabilizace-prace" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Destabilizace práce</ActiveLink></li>
                    <li><ActiveLink href="/dopad" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Ekonomické zasažení domácností</ActiveLink></li>
                    <li><ActiveLink href="/strategie" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Reakce a strategie domácností</ActiveLink></li>
                </ul>
            </div>

            <div style={{ marginTop: "2rem" }}>
                <h3>CHOVÁNÍ A AKTIVITY</h3>
                <ul>
                    <li><ActiveLink href="/protektivni-aktivity" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Počet protektivních aktivit</ActiveLink></li>
                    <li><ActiveLink href="/kontakty" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Kontakt s lidmi</ActiveLink></li>
                </ul>
            </div>
        </>);

    const onMenuButtonClick = e => {
        const openMenuValue = openMenu || props.openMenu;
        setOpenMenu(!openMenuValue);
        if (props.setOpenMenu) {
            props.setOpenMenu(!openMenuValue);
        }
    };
    return (
        <>
            <Head>
                <title>život během pandemie - {props.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap" rel="stylesheet" />

                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177624987-1"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-177624987-1');
                `}} />
            </Head>
            <nav className="top-menu">
                <Link href="/destabilizace-prace"><a style={navbarItemStylePadding}>Život během pandemie</a></Link>
                <Link href="/projekt"><a style={navbarItemStylePadding}>O projektu</a></Link>
                <Link href="/kontakt"><a style={navbarItemStylePadding}>Kontakt</a></Link>
            </nav>
            <nav className="top-menu-mobile">
                <div style={{ overflow: "hidden", backgroundColor: "#F4F4F4", position: "relative", zIndex: 10 }} >
                    <Link href="/destabilizace-prace"><a style={{ ...navbarItemStylePadding, display: "block" }}>Život během pandemie</a></Link>
                    <div style={{ display: openMenu || props.openMenu ? "flex" : "none", flexDirection: "column", margin: "0 16px" }}>
                        {menu}
                        <hr style={{ width: "100%" }} />
                        <div>
                            <ul>
                                <li><Link href="/projekt" ><a style={navbarItemStyle}>O projektu</a></Link></li>
                                <li><Link href="/kontakt"><a style={navbarItemStyle}>Kontakt</a></Link></li>
                            </ul>
                        </div>
                    </div>
                    <a href="javascript:void(0);" className="icon" onClick={onMenuButtonClick} style={{ ...navbarItemStylePadding, fontSize: "17px", display: "block", position: "absolute", right: 0, top: 0 }}>
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
            </nav>
            <div className="main-wrapper">
                <div className="side-menu">
                    <header>
                        <Link href="/destabilizace-prace"><a><h1 style={{ color: "#eec94e", lineHeight: "1.9rem", fontSize: "1.9rem" }} >život během pandemie</h1></a></Link>
                    </header>
                    <div className="main-menu">
                        <nav>
                            {menu}
                        </nav>
                        <div>
                            <a href="https://www.paqresearch.cz/"><img src="logo-paq.png" width="90" /></a>
                            <hr />
                            <p className="menu-footer">
                                Na projektu se podílí výzkumné společnosti <a href="https://www.paqresearch.cz/">PAQ Research</a>, iniciativa <a href="https://idea.cerge-ei.cz/anti-covid-19/">IDEA AntiCovid</a> a data sbírá agentura <a href="https://www.nms.cz/">NMS</a>.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper container">
                    {props.children}
                </div>
                <div className="main-footer">
                    <p className="menu-footer">Na projektu se podílí výzkumné společnosti <a href="https://www.paqresearch.cz/">PAQ Research</a>, iniciativa <a href="https://idea.cerge-ei.cz/anti-covid-19/">IDEA AntiCovid</a> a data sbírá agentura <a href="https://www.nms.cz/">NMS</a>.</p>
                </div>
            </div>
        </>
    )
}