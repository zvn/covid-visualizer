import logo from './logo.svg';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NumberWidget from './NumberWidget';

function App() {
  return (
    <>
      <Container class="p-4">
        <Row className="justify-content-md-center col-sm-10">
          <Col>
            <h1>COVID-19 Dashboard for Taiwan</h1>
          </Col>
        </Row>
        <Row className = "justify-content-md-center">
          <Col class="col-sm-4"> 
            <NumberWidget
              title="Cases"
              subtitle="People Tested Positive" 
              daily="3"
              sevendays="40"
              trending_number="5"
              trending_percent="30"
              more_better="false" >
            </NumberWidget> 
          </Col>
          <Col class="col-sm-4"> 
            <NumberWidget
              title="Deaths" 
              subtitle="Death of COVID-19" 
              daily="1"
              sevendays="25"
              trending_number="-3"
              trending_percent="-6"
              more_better="false" >
            </NumberWidget> 
          </Col>
        </Row>
      </Container>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
    </>
  );
}

export default App;
