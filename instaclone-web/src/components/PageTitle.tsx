import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }: any) => {
  return (
    <Helmet>
      <title>{title} | 인스타 클론</title>
    </Helmet>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
