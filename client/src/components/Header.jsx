import "../styles/header.css";

const Header = () => {
    return (
        <div className="header">
            <div className="headerTitles">
                {/* <span className="headerTitleSml"> Ceci est un petit titre</span> */}
                <span className="headerTitleLrg">Daily Life Pictures</span>
            </div> 
            <img src="https://zupimages.net/up/21/23/uo7n.jpg" alt="Travelpicture" className="headerImg" />
        </div>
    );
};

export default Header;