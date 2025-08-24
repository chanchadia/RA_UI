import LOGO from "../assets/Logo.png";

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  return (
    <img
      src={LOGO}
      alt="Logo"
      style={{
        width: "260.05px",
        height: "100%",
        left: "19px",
        top: "15px",
      }}
    />
  );
};

export default Logo;
