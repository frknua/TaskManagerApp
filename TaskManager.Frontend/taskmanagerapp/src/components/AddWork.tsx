import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Work } from '../models/Work';
import { useForm } from "react-hook-form";

const AddWork = (props:any) => {
  const handleClose = () => props.setModal(false);
  const handleSave = (e:Work) => {
    props.saveWork(e);
  };
  const { register, formState: { errors }, handleSubmit } = useForm();

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleSave)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"                
                {...register("title", { required: true })}               
                autoFocus
              />
              {errors.title && <span className="customError">Title is required</span>}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" required rows={3} 
              {...register("description", { required: true })}             
              />
              {errors.description && <span className="customError">Description is required</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Create Date</Form.Label>
              <Form.Control
                type="date"   
                {...register("createDate", { required: true })}              
              />
              {errors.createDate && <span className="customError">Create Date is required</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Deadline Date</Form.Label>
              <Form.Control
                type="date"         
                {...register("deadLineDate", { required: true })}      
              />
              {errors.deadLineDate && <span className="customError">Deadline Date is required</span>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit(handleSave)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AddWork;