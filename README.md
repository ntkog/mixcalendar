# mixcalendar
Simple node module for generating calendar of selected meetup communities

# INSTALL

```bash
git clone https://github.com/ntkog/mixcalendar.git
npm install
```

# Setup

- Edit [setup.json](https://github.com/ntkog/mixcalendar/blob/master/setup.json) , adding or removing the communities you want to track in the calendar ( In Meetup case, add the {{urlname}} of the community , ej of the full URL of a community  https://meetup.com/{{urlname}} ).
- Edit [index.js](https://github.com/ntkog/mixcalendar/blob/master/index.js) : **CALENDAR_NAME**

# Run It

```bash
node index.js
```
