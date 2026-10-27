import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchNews, type NewsArticle } from "../../api/news";
import ArticleList from "./article_list";



export default function NewsItems(){
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [searchValue, setSearchValue] = useState('');

  
  useEffect(() => {
    const controller = new AbortController();

    async function loadNews() {

      try {
        // const res = await fetchNews(controller.signal)
        setArticles(sortArticles(await fetchNews(searchValue)));
      } catch (requestError) {
        if (!controller.signal.aborted) {
          console.log(requestError)
        }
      } 
      
    }

    void loadNews();
    return () => controller.abort();
  }, []);

    function sortArticles(input_articles:any){
        let sorted = input_articles.sort((a:any,b:any)=>{
            return new Date(a.webPublicationDate).getTime() - 
            new Date(b.webPublicationDate).getTime()
        }).reverse();
        return sorted;
    }

    async function searchArticles(s_value:String){
        setArticles(sortArticles(await fetchNews(s_value)))
    }



    return(
        <Box sx={{
            display:'flex',
            flexDirection:'column'
            }}>
                <Box sx={{
                    display:'flex',
                    flexDirection:'column'}}>
                    <TextField 
                    id="outlined-basic" 
                    label="Search Categories or Topics" 
                    variant="outlined"
                    value={searchValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchValue(event.target.value);
                    }}
                    />
                    <Button variant='contained' sx={{alignItems:'flex-end', mt:'2%'}} onClick={()=>searchArticles(searchValue)}>Search</Button>
                </Box>
                <ArticleList articles={articles}/>
        </Box>
    )
}