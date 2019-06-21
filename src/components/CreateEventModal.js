import React, { Component } from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Button, Form, Input, Modal, TextArea } from "semantic-ui-react";
import { createEventMutation } from "../graphql/mutations";
import { eventsQuery } from "../graphql/queries";

class CreateEventModal extends Component {
  state = {
    name: "",
    description: "",
    price: 0,
    date: "",
    loading: false
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, description, price, date } = this.state;
    this.setState({ loading: true, errors: [] }, async () => {
      const {
        data: {
          createEvent: { success, errors }
        }
      } = await this.props.mutate({
        variables: { name, description, price: Number(price), date },
        update: (
          store,
          {
            data: {
              createEvent: { success, event }
            }
          }
        ) => {
          if (!success) return;
          const data = store.readQuery({ query: eventsQuery });
          data.events.unshift(event);
          store.writeQuery({ query: eventsQuery, data });
        }
      });
      if (!success) {
        this.setState({
          loading: false,
          errors,
          name: "",
          description: "",
          price: "",
          date: ""
        });
      } else {
        this.props.closeModal();
      }
    });
  };

  render() {
    const { open, closeModal } = this.props;
    const { name, description, price, date, loading } = this.state;
    return (
      <Modal open={open}>
        <Modal.Header>Create a new Event</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Field>
              <Input
                name="name"
                value={name}
                placeholder="Event name"
                autoComplete="off"
                onChange={this.handleInputChange}
                autoFocus
              />
            </Form.Field>
            <Form.Field>
              <TextArea
                name="description"
                value={description}
                placeholder="Event description"
                autoComplete="off"
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="number"
                name="price"
                value={price}
                placeholder="Event price"
                autoComplete="off"
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="date"
                name="date"
                value={date}
                placeholder="Event date"
                autoComplete="off"
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Group>
              <Button disabled={loading} fluid color="red" onClick={closeModal}>
                Cancel
              </Button>
              <Button loading={loading} fluid color="twitter">
                Add Event
              </Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default graphql(createEventMutation)(withRouter(CreateEventModal));
