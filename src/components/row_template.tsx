import { Link } from "react-router-dom";
import '../App.css';

interface Trending_Item {
    genre: string;
    id: number;
    original_title: string;
    release_date: string;
    popularity: number;
    poster_path: string;
    adult: boolean;
}

interface Props {
    trending_item : Trending_Item[];
    type: string;
}
export const Row_Template: React.FC<Props> = ({ trending_item, type }) => {

    return(
        <>
        <br />
        <div style={{ width:"100%"}}>
            <div className="banner ">
                <center>
                { type==='movie' ?  
                    ( <h1>Trending {type.toUpperCase() + "S"} </h1>)
                : (<h1>Trending {type.toUpperCase() + " SHOWS"} </h1>)
                }
                </center>
            </div>
            <br />
            <div className="scrollable-row-container">
                <div className="scrollable-row">
                    {trending_item.map(item => (
                        <div key={item.id} className="p-3">
                            <Link to={`${type}/${item.id}`} className="card-link custom-link ">
                                <div className="card h-100 card-body" style={{width:250}}>
                                    <div className='impose'>
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt={item.original_title} />
                                    </div>
                                    <div className="card-body bg_black">
                                        <h5 className="card-title">{item.original_title}</h5>
                                        <p className="card-text">Release Date: {item.release_date}</p>
                                        <p className="card-text">Popularity: {item.popularity}</p>
                                        <p className='card-text'>{item.id}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <br />
        </div>
        </>
    );
}