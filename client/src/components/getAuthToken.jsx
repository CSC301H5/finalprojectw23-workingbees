import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Avatr from "react-avatar-edit"
import hives from '../Assets/hives.png'
import "./Style.css"
import Navbar from "./Navbar";
import HiveComp from './LoginHiveCompient';
import ScrollPage from './scroll';

function getAuthToken(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('x-auth-token=')) {
        return cookie.substring('x-auth-token='.length, cookie.length);
      }
    }
    return null;
  }
  export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }