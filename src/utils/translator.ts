import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  CALENDAR_EN,
  CATEGORY_ANALYSIS_EN,
  COMMON_EN,
  CREATE_EVENT_EN,
  CUSTOMER_EN,
  EVENT_ANALYSIS_EN,
  EXPLORE_EN,
  HELP_EN,
  HOME_EN,
  LANDING_EN,
  MY_EVENT_EN,
  MY_TICKET_EN,
  ORDER_EN,
  OVERVIEW_DETAIL_EN,
  OVERVIEW_EN,
  PAYMENT_EN,
  PROFILE_EN,
  REPORT_EN,
  REVIEW_EN,
  SIGNIN_EN,
  SIGNUP_EN,
  TICKET_SALE_EN,
  TOP_EVENT_EN,
} from "@/translation/en";

import {
  CALENDAR_VN,
  CATEGORY_ANALYSIS_VN,
  COMMON_VN,
  CREATE_EVENT_VN,
  CUSTOMER_VN,
  EVENT_ANALYSIS_VN,
  EXPLORE_VN,
  HELP_VN,
  HOME_VN,
  LANDING_VN,
  MY_EVENT_VN,
  MY_TICKET_VN,
  ORDER_VN,
  OVERVIEW_DETAIL_VN,
  OVERVIEW_VN,
  PAYMENT_VN,
  PROFILE_VN,
  REPORT_VN,
  REVIEW_VN,
  SIGNIN_VN,
  SIGNUP_VN,
  TICKET_SALE_VN,
  TOP_EVENT_VN,
} from "@/translation/vn";

class Translator {
  init = () => {
    const resources = {
      en: {
        landing: LANDING_EN,
        signin: SIGNIN_EN,
        signup: SIGNUP_EN,
        category_analysis: CATEGORY_ANALYSIS_EN,
        customer: CUSTOMER_EN,
        event_analysis: EVENT_ANALYSIS_EN,
        overview_detail: OVERVIEW_DETAIL_EN,
        overview: OVERVIEW_EN,
        payment: PAYMENT_EN,
        ticket_sale: TICKET_SALE_EN,
        create_event: CREATE_EVENT_EN,
        my_event: MY_EVENT_EN,
        my_ticket: MY_TICKET_EN,
        top_event: TOP_EVENT_EN,
        calendar: CALENDAR_EN,
        help: HELP_EN,
        home: HOME_EN,
        explore: EXPLORE_EN,
        order: ORDER_EN,
        report: REPORT_EN,
        review: REVIEW_EN,
        profile: PROFILE_EN,
        common: COMMON_EN,
      },
      vn: {
        landing: LANDING_VN,
        signin: SIGNIN_VN,
        signup: SIGNUP_VN,
        category_analysis: CATEGORY_ANALYSIS_VN,
        customer: CUSTOMER_VN,
        event_analysis: EVENT_ANALYSIS_VN,
        overview_detail: OVERVIEW_DETAIL_VN,
        overview: OVERVIEW_VN,
        payment: PAYMENT_VN,
        ticket_sale: TICKET_SALE_VN,
        create_event: CREATE_EVENT_VN,
        my_event: MY_EVENT_VN,
        my_ticket: MY_TICKET_VN,
        top_event: TOP_EVENT_VN,
        calendar: CALENDAR_VN,
        help: HELP_VN,
        home: HOME_VN,
        explore: EXPLORE_VN,
        order: ORDER_VN,
        report: REPORT_VN,
        review: REVIEW_VN,
        profile: PROFILE_VN,
        common: COMMON_VN,
      },
    };

    const defaultNS = "dashboard";

    i18n.use(initReactI18next).init({
      resources,
      lng: localStorage.getItem("language")! || "en",
      ns: [
        "signin",
        "dashboard",
        "events",
        "create_event",
        "categories",
        "users",
        "permissions",
        "payments",
        "profile",
      ],
      fallbackLng: "en",
      defaultNS,
      interpolation: {
        escapeValue: false,
      },
    });

    i18n.loadNamespaces("dashboard");
  };
}

export const translator = new Translator();
