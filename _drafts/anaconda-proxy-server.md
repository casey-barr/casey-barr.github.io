## Using Anaconda Behind a Firewall or Proxy

This *very* brief blog post will document how to configure Anaconda's `.condarc` file to be able download packages from an external server in a Corporate environment. I'm mainly writing this so I don't have to Google it again if I forget.

To begin, you first have to create the `.condarc` file. Open an Anaconda prompt and type:

```bash
conda config --add channels conda-forge
```

The file will then be created in the `C:\Users\<username>\` directory (on Windows), and you can then open and edit it in your text editor. You simply have to add your proxy information (for HTTP and HTTPS) to the file, and everything should be set.


```bash
channels:
  - conda-forge
  - defaults

proxy_servers:
    http: http://user:pass@hostname:port
    https: http://user:pass@hostname:port
```
