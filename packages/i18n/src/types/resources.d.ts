interface Resources {
  settings: {
    settings: "Settings";
    common: {
      account: "Account";
      workspace: "Workspace";
    };
    "my-account": {
      title: "My account";
      "my-profile": {
        title: "My profile";
        "preferred-name": "Preferred name";
        "remove-photo": "Remove photo";
        "replace-photo": "Replace photo";
      };
      "account-security": {
        title: "Account security";
        email: {
          title: "Email";
          button: "Change email";
        };
        password: {
          title: "Password";
          description: "If you lose access to your school email address, you'll be able to log in using your password.";
          button: "Change password";
        };
        verification: {
          title: "2-step verification";
          description: "Add an additional layer of security to your account during login.";
        };
      };
      support: {
        title: "Support";
        support: {
          title: "Support access";
          description: "Grant Notion support temporary access to your account so we can troubleshoot problems or recover content on your behalf. You can revoke access at any time.";
        };
        logout: {
          title: "Log out of all devices";
          description: "Log out of all other active sessions on other devices besides this one.";
        };
        delete: {
          title: "Delete my account";
          description: "Permanently delete the account and remove access from all workspaces.";
        };
      };
    };
    "my-settings": {
      title: "My Settings";
      "my-settings": {
        appearance: {
          title: "Appearance";
          description: "Customize how Notion looks on your device.";
          options: {
            system: "Use system setting";
            light: "Light";
            dark: "Dark";
          };
        };
        "open-on-start": {
          title: "Open on start";
          description: "Choose what to show when Notion starts or when you switch workspaces.";
          options: {
            last: "Last visited page";
            home: "Home";
            top: "Top page in sidebar";
          };
        };
        "open-links": {
          title: "Open links in desktop app";
          description: "You must have the Mac or Windows app installed";
        };
      };
      "date-time": {
        title: "Date & time";
        "set-timezone": {
          title: "Set timezone automatically using your location";
          description: "Reminders, notifications and emails are delivered based on your time zone.";
        };
        timezone: {
          title: "Time Zone";
          description: "Current time zone setting.";
        };
      };
      privacy: {
        title: "Privacy";
        cookie: {
          title: "Cookie settings";
          description: "Customize cookies. See Cookie Notice for details.";
        };
        "view-history": {
          title: "Show my view history";
          description: "People with edit or full access will be able to see when you've viewed a page. Leran more.";
          options: {
            yes: "Record";
            no: "Don't record";
          };
        };
        "discover-profile": {
          title: "Profile discoverability";
          description: "Users with your email can see your name and profile picture when inviting you to a new workspace. Learn more.";
        };
      };
    };
    "my-notifications": {
      title: "My notifications";
      "my-notifications": {
        mobile: {
          title: "Mobile push notifications";
          description: "Receive push notifications on mentions and comments via your mobile app";
        };
      };
      "slack-notifications": {
        title: "Slack notifications";
        slack: {
          title: "Slack notifications";
          description: "Receive notifications in your Slack workspace when you're mentioned in a page, database property, or comment";
          options: {
            off: "Off";
          };
        };
      };
      "email-notifications": {
        title: "Email notifications";
        activity: {
          title: "Activity in your workspace";
          description: "Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes";
        };
        digests: {
          title: "Email digests";
          description: "Receive email digests every 8 hours for changes to pages you're subscribed to";
        };
        announcements: {
          title: "Announcements and update emails";
          description: "Receive occasional emails about product launches and new features from Notion";
          button: "Manage settings";
        };
      };
      buttons: {
        more: "Learn about notifications";
      };
    };
    "my-connections": {
      title: "My connections";
      buttons: {
        browse: "Browse connections in Gallery";
        integrations: "Develop or manage integrations";
        more: "Learn more about connections";
      };
    };
    "language-region": {
      title: "Language & region";
      region: {
        language: {
          title: "Language";
          description: "Change the language used in the user interface.";
          options: {
            en: "English";
            de: "Deutsch";
            es: "Español";
          };
        };
        "start-week": {
          title: "Start week on Monday";
          description: "This will change how all calendars in your app look.";
        };
      };
    };
    "workspace-settings": {
      title: "Settings";
    };
    people: {
      title: "People";
    };
    plans: {
      title: "Plans";
    };
    billing: {
      title: "Billing";
    };
    sites: {
      title: "Sites";
    };
    security: {
      title: "Security";
    };
    identity: {
      title: "Identity & provisioning";
    };
    connections: {
      title: "Connections";
    };
    import: {
      title: "Import";
    };
  };
}

export default Resources;
