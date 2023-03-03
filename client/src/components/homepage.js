import React, { Component } from 'react';
import axios from 'axios';
import "./buttons.css"
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

export default Button;

