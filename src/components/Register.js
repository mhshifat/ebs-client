import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Input,
  Message
} from "semantic-ui-react";
import { registerMutation } from "../graphql/mutations";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    this.setState({ loading: true, errors: [] }, async () => {
      const {
        data: {
          register: { success, errors }
        }
      } = await this.props.mutate({
        variables: { username, email, password }
      });
      if (!success) {
        this.setState({ loading: false, errors });
      } else {
        this.props.history.push("/login");
      }
    });
  };

  render() {
    const { username, email, password, errors, loading } = this.state;
    return (
      <Container>
        <div style={{ width: 350, margin: "0 auto", marginTop: 150 }}>
          <Header as="h3">Register</Header>
          <Divider />
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Field>
              <Input
                name="username"
                value={username}
                onChange={this.handleInputChange}
                placeholder="Username"
                autoComplete="off"
                autoFocus
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                placeholder="Email"
                autoComplete="off"
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Field>
            <Button loading={loading} fluid color="instagram">
              Create an Account
            </Button>
          </Form>
          {errors.length > 0 && (
            <Message
              error
              header="There was some errors with your submission"
              list={errors.map(err => err.message)}
            />
          )}
        </div>
      </Container>
    );
  }
}

export default graphql(registerMutation)(Register);
