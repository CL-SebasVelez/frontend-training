import React from 'react';
import renderer from 'react-test-renderer';

import NewsCard from './NewsCard';

describe('NewsCard component', () => {
  it('should render with default props', () => {
    const tree = renderer.create(<NewsCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should launch error when pass wrong prop types', () => {
    const { url, image, title, description } = 10;
    expect(() =>
      shallow(
        <NewsCard
          url={url}
          image={image}
          title={title}
          description={description}
        />
      )
    ).toThrowError();
  });

  it('should render all props as passed it', () => {
    const title = 'New NewsCard';
    const image =
      'https://www.bnd.com/latest-news/ppc7fl/picture222958020/alternates/LANDSCAPE_768/NEWSnew.jpg';
    const url =
      'https://www.bnd.com/latest-news/ppc7fl/picture222958020/alternates/LANDSCAPE_768/NEWSnew.jpg';
    const description = 'Description NewsCard';

    const testRenderer = renderer.create(
      <NewsCard
        title={title}
        image={image}
        url={url}
        description={description}
      />
    );
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(NewsCard).props.title).toBe(title);
    expect(testInstance.findByType(NewsCard).props.image).toBe(image);
    expect(testInstance.findByType(NewsCard).props.url).toBe(url);
    expect(testInstance.findByType(NewsCard).props.description).toBe(
      description
    );
  });
});
