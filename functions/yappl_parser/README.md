# YaPPL Parser

Since this is a ruby function with some libary dependencies, there are
some things we have to consider before deploying.
To bundle up the dependencies, we need to deploy a zip archive. This is
already configured in the manifest.yml, you simply need to create a
`yappl_parser.zip` file.

First, install the dependencies via `bundle install --standalone`.

Then, create the zip via: `zip -r yappl_parser.zip main.rb bundle`.

Finally, you can deploy as usual via `wskdeploy`
