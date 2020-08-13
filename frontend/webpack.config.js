const path = require('path');

module.exports = {
  mode: "development",
	entry: ['babel-polyfill', path.resolve(__dirname, 'bethehero/frontend/src/index.js')],
    output: {
        path: path.resolve(__dirname, "bethehero/frontend/static/frontend/public/"),       
        publicPath: "/static/frontend/public/",
        filename: 'main.js',  
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {presets: ["@babel/env"]}
          }
        },
       
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                query: {
                  name:'assets/[name].[ext]'
                }
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                query: {
                  mozjpeg: {
                    progressive: true,
                  },
                  gifsicle: {
                    interlaced: true,
                  },
                  optipng: {
                    optimizationLevel: 7,
                  }
                }
              }
            }]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
          
        },

        {
          test: /\.(scss)$/,
          use: [{
            loader: 'style-loader', 
          }, {
            loader: 'css-loader', 
          }, {
            loader: 'postcss-loader', 
            options: {
              plugins: function () { 
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader' 
          }]
        },
      ]
    }
  };