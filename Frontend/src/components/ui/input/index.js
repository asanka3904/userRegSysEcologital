import { Form, Col, Row } from "react-bootstrap";
//create input element using props
export default function Inputform(props) {
  return (
    <Form.Group as={Col} controlId={props.name}>
      <Form.Label> {props.Label}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </Form.Group>
  );
}
