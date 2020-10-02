import React from 'react';

function NewsCard(props) {
  const handleClick = (url) => {
    window.open(url, '_blank');
  };
  const open = props.url ? 'c-pointer' : '';
  return (
    <div
      className={`card ${open} mb-20`}
      onClick={() => (props.url ? handleClick(props.url) : void 0)}
    >
      <div className="card-image">
        <img src={props.image} alt="" />
      </div>
      <div className="card-title mt-5">
        <p>{props.title}</p>
      </div>
      <div className="card-content">
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default NewsCard;
