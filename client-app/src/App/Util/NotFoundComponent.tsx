import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - Not sure what you're looking for!
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/player" primary>
          Return to the media player page!
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
