public String loginWithUserPass(String user, String pass) throws Exception {
    String url = "https://api.auth.gg/v1/", charset = StandardCharsets.UTF_8.name();
    String hwid = getHWID(), secret = "*secret*", aid = "*aid*";

    String query = String.format("type=login&hwid=%s&password=%s&username=%s&secret=%s&apikey=%s&aid=%s",
        URLEncoder.encode(hwid, charset),
        URLEncoder.encode(pass, charset),
        URLEncoder.encode(user, charset),
        URLEncoder.encode(secret, charset),
        URLEncoder.encode(apikey, charset),
        URLEncoder.encode(aid, charset));

    HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
    connection.setDoOutput(true);
    connection.setRequestProperty("Accept-Charset", charset);
    connection.setRequestProperty("User-Agent", "LoginSystem");
    connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=" + charset);
    try (OutputStream output = connection.getOutputStream()) {
        output.write(query.getBytes(charset));
    }

    InputStream response = connection.getInputStream();
    if (connection.getResponseCode() == 200) {
        BufferedReader br = new BufferedReader(new InputStreamReader(response));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(sb.toString());
        return element.getAsJsonObject().get("result").getAsString();

    }
    return null;
}