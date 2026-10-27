
import { Box } from '@mui/material';
import NewsItems from '../compenents/latest_news/newsItems';

export default function HomePage() {
  

  return (
    <section aria-labelledby="home-title" className="page news-page">
      <p className="eyebrow">Latest updates</p>
      <h1 id="home-title">News</h1>
      <p className="page-description">Search for stories</p>

      <Box sx={{
        display:'flex',
        flexDirection:'column'
      }}>
        <Box>
          <NewsItems/>
        </Box>
      </Box>

      
    </section>
  );
}
