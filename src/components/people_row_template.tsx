import { Link } from "react-router-dom";
import '../App.css';
export interface Person_Item {
    known_for_department: string;
    id: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}

interface Props {
    items : Person_Item[];
    type: string;
}
export const People_Row_Template: React.FC<Props> = ({ items, type }) => {

    return(
        <div style={{ width:"100%"}}>
            <div className="banner">
                <center>
                    <h1>Trending {type.toUpperCase()} </h1>
                </center>
            </div>
            <br />
            <div className="scrollable-row-container">
                <div className="scrollable-row">
                    {items.map(item => (
                        <div key={item.id} className="p-3">
                            <Link to={`person/${item.original_name}`} className="card-link custom-link ">
                                <div className="card h-100 card-body" style={{width:250}}>
                                    <div className='impose'>
                                        <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} className="card-img-top" alt={item.original_name} />
                                    </div>
                                    <div className="card-body bg_black">
                                        <h5 className="card-title">{item.original_name}</h5>
                                        <p className="card-text">Popularity: {item.popularity}</p>
                                        <p className='card-text'>{item.id}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>   
        </div>

    );
}