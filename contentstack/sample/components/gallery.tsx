import parse from 'html-react-parser';
import ImageNext from 'next/image';
import React, { useState } from 'react';

type GalleryReactProps = {
  data: any;
  heading: any;
  showFilter: boolean;
  showDescription: boolean;
  description: any;
};

const GalleryReact = ({
  data,
  heading,
  description,
  showFilter,
  showDescription,
}: GalleryReactProps) => {
  const [items, setItems] = useState(data);
  const [active, setActive] = useState(false);
  const powersList: string[] = [];

  const filterItem = (categItem: string) => {
    const updateItems = data?.filter((curElem: { powers: string[] }) => {
      return curElem.powers[0] === categItem[0];
    });
    setItems(updateItems);
    setActive(true);
  };

  const renderHeading = () => (
    <>
      <nav className="navbar mt-2">
        <span className="navbar-brand mb-0 m-auto h1 text-center">
          {heading}
        </span>
      </nav>
      <br />
    </>
  );

  const renderDescription = () => (
    <div className="container">
      <p className=" text-center">{description}</p>
    </div>
  );

  const renderSuperheroNav = () => (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          onClick={() => setItems(data)}
          value="flexRadioDefault"
          defaultChecked
        />
        <label className="form-check-label">All</label>
      </div>
      {powersList?.map(renderPowerItem)}
    </>
  );

  const renderItem = (
    elem: {
      $: any;
      id: any;
      title: any;
      url: any;
      image: any;
      description: any;
      powers: any;
    },
    index: any,
  ) => {
    const { id, title, image, description, powers, url } = elem;
    return (
      <React.Fragment key={index.toString()}>
        {/* <div className="col-md-6 col-lg-4" id={id}> */}
        <div className="gallery-featured-blogs col-md-6 col-lg-4">
          <div className="featured-gallery">
            <a href={url} className="test">
              {image?.url ? (
                <ImageNext
                  className={`img-fluid ${
                    showFilter === false ? 'large-img' : ''
                  }`}
                  src={image?.url}
                  alt={image?.filename}
                  {...(image.$?.url as {})}
                  width={320}
                  height={320}
                />
              ) : (
                ''
              )}
              <div className="featured-content">
                {/* <h3 data-cslp="blog_post.blt7ca504fb3c955cc0.en-us.title" className="">The  modern Cloud Ecosystem</h3> */}
                <div>
                  <h5 className="card-title mb-2" {...(elem.$?.title as {})}>
                    {elem?.title}
                  </h5>
                  <div className="pb-3" {...(elem.$?.powers as {})}>
                    Power: {elem?.powers}
                  </div>
                  {showDescription === true ? (
                    <div {...elem.$?.description}>
                      {parse(elem?.description.substr(0, 120) + '...')}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </a>
          </div>
        </div>
        {/* </div> */}
      </React.Fragment>
    );
  };

  const renderPowerItem = (dataList: string, index: number) => (
    <div className="form-check" key={`listing${index.toString()}`}>
      <input
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault2"
        onClick={() => filterItem(dataList)}
        value={dataList}
      />
      <label className="form-check-label">{dataList}</label>
    </div>
  );

  return (
    <>
      {heading ? renderHeading() : ''}
      {description ? renderDescription() : ''}

      <div className="container">
        <div className="row mt-5">
          <div
            className={`col-md-12 col-lg-3 ${
              showFilter === false ? 'd-none' : ' '
            }`}
          >
            <h3 className="mb-3">Categories</h3>
            <hr className="mt-0" />
            {data?.map(
              (data: { powers: string }, indx: { toString: () => any }) =>
                powersList.includes(data?.powers) === true
                  ? ''
                  : powersList.push(data?.powers),
            )}

            <ul className="superhero-nav">{renderSuperheroNav()}</ul>
            <hr />
          </div>
          <div
            className={`${
              showFilter === false ? 'col-12' : 'col-md-12 col-lg-9 '
            }`}
          >
            <div className="container-fluid mt-4">
              <div className="row justify-content-center">
                {items?.map(renderItem)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryReact;
