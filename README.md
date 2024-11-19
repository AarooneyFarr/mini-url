# Implementation Details

Mini URL is a url shortener similar to bitly using NextJs and React. It uses a server side custom Map implementation to track the created urls and their respective slugs. This allows server side redirecting,
but comes with the trade-off that the url and slug must be sent to a backend api to parse.

## How to Run

First install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Testing

Was not able to finish setting up tooling for automated testing.

First install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run test
```

## Tools used

Used ChatGPT as a general reference to quickly reference ts APIs. This is how I found the UUID library used in encoding the url slugs
