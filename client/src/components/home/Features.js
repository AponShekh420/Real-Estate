const Features = () => {
  // Define an array of feature objects
  const features = [
    {
      icon: "fa-solid fa-house-chimney-user",
      title: "Community Search",
      description:
        "We have compiled the nation’s leading database of retirement communities.  We did the research so you don’t have to!",
    },
    {
      icon: "fa-solid fa-money-check-dollar",
      title: "Home Buying",
      description:
        "We work with a nationwide network of real estate agents who can assist you with the home buying process.",
    },
    {
      icon: "fa-solid fa-sack-dollar",
      title: "Home Financing",
      description:
        "We also have a vast network of mortgage lenders we can recommend to help finance your home.",
    },
  ];

  return (
    <>
      {features.map((feature, index) => (
        <div className="list-one d-flex align-items-start mb30" key={index}>
          <span className={`list-icon flex-shrink-0 ${feature.icon}`} />
          <div className="list-content flex-grow-1 ml20">
            <h6 className="mb-1">{feature.title}</h6>
            <p className="text mb-0 fz15">{feature.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Features;
