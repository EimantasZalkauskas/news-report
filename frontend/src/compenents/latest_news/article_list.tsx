import { Box } from "@mui/material";

interface props{
    articles:any
}

export default function ArticleList(props:props){

    return(
         <Box>
                {props.articles.length === 0 && (
                    <p className="news-status">No news articles found.</p>
                )}
                {props.articles.length > 0 && (
                    <ul className="news-list">
                    {props.articles.map((article:any) => (
                        <li className="news-card" key={article.id}>
                        <p className="news-section">{article.sectionName}</p>
                        <h2>
                            <a href={article.webUrl} rel="noreferrer" target="_blank">
                            {article.webTitle}
                            </a>
                        </h2>
                        <time dateTime={article.webPublicationDate}>
                            {new Date(article.webPublicationDate).toLocaleDateString()}
                        </time>
                        </li>
                    ))}
                    </ul>
                )}
            </Box>
    )
}