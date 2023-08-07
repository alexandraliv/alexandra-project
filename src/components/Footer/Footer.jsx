import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <section className="footer flex-center">
      <div>
        <h1 className="text-footer">Follow us</h1>
        <div className="icons-section">
          <a href="http://facebook.com" target="_blank">
            <FacebookIcon fontSize="large" />
          </a>
          <a href="http://instagram.com" target="_blank">
            <InstagramIcon fontSize="large" />
          </a>
          <a href="http://twitter.com" target="_blank">
            <TwitterIcon fontSize="large" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;

