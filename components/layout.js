import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "./Image";

const menuItemStyle = { color: "#7C8A92" };
const activeMenuItemStyle = { fontWeight: "bold" };
const navbarItemStyle = {
  color: "#707070",
};
const navbarItemStylePadding = {
  ...navbarItemStyle,
  padding: "14px 16px",
};
function ActiveLink({ children, href, style, activeStyle }) {
  const router = useRouter();
  const isActive =
    (router.pathname === href || router.asPath.startsWith(href)) &&
    router.pathname !== "/";
  return (
    <Link href={href}>
      <a style={isActive ? activeStyle : style}>{children}</a>
    </Link>
  );
}

function MenuGroup({ margin, title, items }) {
  const links = items.map((i, index) => (
    <li key={index}>
      <ActiveLink
        href={`/${i.key}`}
        style={menuItemStyle}
        activeStyle={activeMenuItemStyle}
      >
        {i.title}
      </ActiveLink>
    </li>
  ));
  return (
    <div style={{ marginTop: margin }}>
      <h3>{title.toUpperCase()}</h3>
      <ul>{links}</ul>
    </div>
  );
}

export default function Layout(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/ekonomicke-dopady");
    }
  }, []);

  const menu = props.menuItemsData ? (
    props.menuItemsData.map((item, index) => (
      <MenuGroup
        margin={index === 0 ? "4em" : "2em"}
        title={item.title}
        items={item.items}
        key={index}
      />
    ))
  ) : (
    <></>
  );
  const defaultUrl = props.menuItemsData
    ? props.menuItemsData[0].items[0].key
    : "";

  const onMenuButtonClick = (e) => {
    e.preventDefault();
    const openMenuValue = openMenu || props.openMenu;
    setOpenMenu(!openMenuValue);
    if (props.setOpenMenu) {
      props.setOpenMenu(!openMenuValue);
    }
  };
  return (
    <>
      <Head>
        <title>Život k nezaplacení - {props.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          key="share-image"
          property="og:image"
          content="https://data.irozhlas.cz/zivot/ekonomicke-dopady.png"
        />
        <meta
          property="og:title"
          content="Český rozhlas a PAQ Research: Život k nezaplacení"
        />
        <meta name="twitter:card" content="summary" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KB3JR9L');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer.push({"configGemiusId": ".AGbkHxOpDTrDJT4gULQydTa38O1ESN_CYN2Y62XFGz.z7"});
            `,
          }}
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <nav className="top-menu">
        <Link href="https://irozhlas.cz/">
          <a
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Image
              src="../logo/irozhlas.svg"
              height={50}
              width={120}
              unoptimized={true}
            ></Image>
          </a>
        </Link>
        <Link href="/projekt">
          <a style={{ ...navbarItemStylePadding, marginLeft: "auto" }}>
            O projektu
          </a>
        </Link>
      </nav>
      <nav className="top-menu-mobile">
        <div
          style={{
            overflow: "hidden",
            backgroundColor: "#F4F4F4",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Link href="https://irozhlas.cz/">
            <a style={{ display: "block", padding: "0px 16px" }}>
              <Image
                src="../logo/irozhlas.svg"
                height={50}
                width={120}
                unoptimized={true}
              ></Image>
            </a>
          </Link>
          <div
            style={{
              display: openMenu || props.openMenu ? "flex" : "none",
              flexDirection: "column",
              margin: "0 16px",
            }}
          >
            {menu}
            <hr style={{ width: "100%" }} />
            <div>
              <ul>
                <li>
                  <Link href="/projekt">
                    <a style={navbarItemStyle}>O projektu</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <a
            href="#"
            className="icon"
            onClick={onMenuButtonClick}
            style={{
              ...navbarItemStylePadding,
              fontSize: "17px",
              display: "block",
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <i className="fa fa-bars"></i>
          </a>
        </div>
      </nav>
      <div className="main-wrapper">
        <div className="side-menu">
          <header>
            <Link href="[key]" as={`/${defaultUrl}`}>
              <a>
                <Image
                  src="../logo/cesko22.svg"
                  height={115}
                  width={170}
                  unoptimized={true}
                />
              </a>
            </Link>{" "}
          </header>
          <div className="main-menu">
            <nav>{menu}</nav>
            <div>
              {/* <Link href="https://irozhlas.cz/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Logo_iRozhlas.cz.svg/320px-Logo_iRozhlas.cz.svg.png"
                  width="90"
                  style={logoStyle}
                />
              </Link> */}
              <hr />
              <p className="menu-footer">
                Projekt{" "}
                <Link href="https://portal.rozhlas.cz/">Českého rozhlasu</Link>{" "}
                a výzkumné společnosti{" "}
                <Link href="https://www.paqresearch.cz/">PAQ Research</Link>.
                Data sbírá agentura <a href="https://www.nms.cz/">NMS</a>.
              </p>
            </div>
          </div>
        </div>
        <div className="content-wrapper container">{props.children}</div>
        <div className="main-footer">
          <p className="menu-footer">
            Projekt{" "}
            <Link href="https://portal.rozhlas.cz/">Českého rozhlasu</Link> a
            výzkumné společnosti{" "}
            <Link href="https://www.paqresearch.cz/">PAQ Research</Link>. Data
            sbírá agentura <a href="https://www.nms.cz/">NMS</a>.
          </p>
        </div>
      </div>
    </>
  );
}
