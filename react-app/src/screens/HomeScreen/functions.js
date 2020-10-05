import {
    API_KEY,
    API_URL,
    API_HOST
} from '../../constants/config';

/**
 *  Get news from API
 * @param {string} term = Term to search
 * @param {int} offset  = Position to start searching from API
 * @param {int} count   = Number of items to search
 */
async function getNews(term = 'trending', count = 4) {
    return await fetch(
            `${API_URL}/search?q=${term}&mkt=es-ES&count=${count}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': API_HOST,
                    'x-rapidapi-key': API_KEY,
                },
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => data.value)
        .catch((err) => {
            console.log(err);
        });
}

/**
 * Get news from getNews function and set values.
 * @param {function} setNews
 * @param {function} setLoading
 * @param {function} setCount
 * @param {function} setError
 * @param {string} term
 * @param {int} count
 */
function getStories(setNews, setLoading, setCount, setError, term, count) {
    getNews(term, count)
        .then((data) => {
            setNews(data);
            setLoading(false);
            setCount(count + 4);
        })
        .catch((err) => {
            setError(true);
        });
}

/**
 * Save on localStorage the alert item for don't show again after.
 * @param {function} setShowAlert
 */
function dismissAlert(setShowAlert) {
    localStorage.setItem('alert', "true");
    setShowAlert(false);
}

export {
    getStories,
    dismissAlert
};