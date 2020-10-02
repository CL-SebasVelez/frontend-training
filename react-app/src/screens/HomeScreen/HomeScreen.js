import React, { useState, useEffect } from 'react';
import Alert from 'emerald-ui/lib/Alert';
import Button from 'emerald-ui/lib/Button';
import Navbar from '../../components/Navbar';
import Spinner from 'emerald-ui/lib/Spinner';
import NewsCard from '../../components/NewsCard';
import { getStories, dismissAlert } from './functions';
import ContactForm from '../../components/ContactForm/ContactForm';

function HomeScreen(props) {
  const [news, setNews] = useState([]);
  const [term] = useState('trending');
  const [count, setCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAlert, setShowAlert] = useState(
    localStorage.getItem('alert') ? false : true
  );

  useEffect(() => {
    getStories(setNews, setLoading, setCount, setError, term, count);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section id="news-container">
          {showAlert ? (
            <Alert
              dismissible
              style={{ margin: '25px 0' }}
              onDismiss={() => {
                dismissAlert(setShowAlert);
              }}
            >
              <div style={{ padding: '10px 0' }}>
                Welcome to the new look of News.com. Keep scrolling to discover
                interesting new features and news.
              </div>
            </Alert>
          ) : (
            <></>
          )}

          <h1>Top news</h1>
          <div id="news" className={`${loading ? 'news-loading' : ''}`}>
            {loading ? (
              <Spinner />
            ) : error ? (
              <div>{error}</div>
            ) : (
              news.map((element, index) => {
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
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}

export default HomeScreen;
