import React, { useState, useEffect } from 'react';
import Alert from 'emerald-ui/lib/Alert';
import Button from 'emerald-ui/lib/Button';
import Navbar from '../../components/Navbar';
import Spinner from 'emerald-ui/lib/Spinner';
import Checkbox from 'emerald-ui/lib/Checkbox';
import TextField from 'emerald-ui/lib/TextField';
import NewsCard from '../../components/NewsCard';
import { getStories } from './functions';

const styles = {
  news: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(403px, 1fr))',
  },
  newsLoading: {
    gridTemplateColumns: '1fr',
  },
};

function HomeScreen(props) {
  const [news, setNews] = useState([]);
  const [term, setTerm] = useState('trending');
  const [count, setCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getStories(setNews, setLoading, setCount, setError, term, count);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section id="news-container">
          <Alert dismissible style={{ margin: '25px 0' }}>
            <div style={{ padding: '10px 0' }}>
              Welcome to the new look of News.com. Keep scrolling to discover
              interesting new features and news.
            </div>
          </Alert>
          <h1>Top news</h1>
          <div id="news" style={loading ? styles.newsLoading : styles.news}>
            {loading ? (
              <Spinner />
            ) : error ? (
              <div>{error}</div>
            ) : (
              news.map((element, index) => {
                console.log('emtre');
                const image =
                  'image' in element
                    ? element.image.thumbnail.contentUrl
                    : 'https://www.bnd.com/latest-news/ppc7fl/picture222958020/alternates/LANDSCAPE_768/NEWSnew.jpg';
                return (
                  <NewsCard
                    image={image}
                    title={element.name}
                    description={element.description}
                    key={index}
                    url={element.url}
                  />
                );
              })
            )}
          </div>
          <Button
            className="a-self-center mt-5 mb-10"
            id="more-stories"
            color="info"
            onClick={() => {
              getStories(setNews, setLoading, setCount, setError, term, count);
            }}
          >
            <span>View more stories</span>
          </Button>
        </section>
        <section id="newsletter">
          <div className="container">
            <h2>Subscribe to our newsletter</h2>
            <p className="mt-5 mb-6">
              Subscribe to our newsletter to receive weekly digests of the vest
              ad most ground-breaking news. Also receive a discount o your
              monthly subscription.
            </p>
            <Button className="btn btn-outline-white" shape="outline">
              <span className="text-white">Subscribe</span>
            </Button>
          </div>
        </section>
        <section id="contact-us">
          <h2 className="mt-4">Contact Us</h2>
          <div id="container-form" className="mb-6">
            <form action="" className="d-flex flex-wrap" id="form-contact-us">
              <div className="form-group w-50">
                <label htmlFor="first-name">First name</label>
                <TextField
                  name="first-name"
                  className="form-control validate w-88"
                />
                <p className="d-none text-error">This field is required</p>
              </div>
              <div className="form-group w-50">
                <label htmlFor="last-name">Last name</label>
                <TextField
                  name="last-name"
                  className="form-control validate w-88"
                />
                <p className="d-none text-error">This field is required</p>
              </div>
              <div className="form-group w-50">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control validate"
                />
                <p className="d-none text-error">
                  This field is required or its format is wrong
                </p>
              </div>
              <div className="form-group w-50">
                <label htmlFor="number">Phone number</label>
                <input
                  type="number"
                  name="number"
                  className="form-control validate"
                />
                <p className="d-none text-error">
                  This field is required or its format is wrong
                </p>
              </div>
              <div className="form-group w-100">
                <label htmlFor="message">Message</label>
                <TextField
                  name="message"
                  className="form-control validate w-94"
                  textarea={true}
                />
                <p className="d-none text-error">This field is required</p>
              </div>
              <div className="form-group w-100 mt-5">
                <Checkbox
                  defaultChecked
                  label="Send me emails about breaking news and promotions."
                />
              </div>
              <div className="form-group w-100 mt-6 d-flex j-content-center">
                <Button
                  className="a-self-center mt-5 mb-10 btn btn-default"
                  id="more-stories"
                  color="info"
                  type="submit"
                >
                  <span>Submit form</span>
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomeScreen;
