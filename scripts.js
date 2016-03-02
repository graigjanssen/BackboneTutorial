// Backbone Model

var Blog = Backbone.Model.extend({
  defaults: {
    author: '',
    title: '',
    url: ''
  }
});

// Backbone collection (empty)

var Blogs = Backbone.Collection.extend({

});

// Model instances
// var blog1 = new Blog({
//   author: 'Jerry',
//   title: 'Hungry For Apples',
//   url: 'http://hungryforapples.com'
// });
//
// var blog2 = new Blog({
//   author: 'Bird Person',
//   title: 'Bird World',
//   url: 'http://birdworld.com'
// });

// Collection instance

var blogs = new Blogs([]);

// Backbone Views //

// View for one blog //
var BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function(){
    // On creation of new BlogView, set template to the Underscore template in index.html
    this.template = _.template($('.blogs-list-template').html());
  },
  events: {
    'click .edit-blog': 'edit',
    'click .update-blog': 'update'
  },
  edit: function(){
    // Update buttons for updating entry
    $('.edit-blog').hide();
    $('.delete-blog').hide();
    $('.update-blog').show();
    $('.cancel').show();

    // Store values from this item's <span>s for use in update form
    var author = this.$('.author').html();
    var title = this.$('.title').html();
    var url = this.$('.url').html();

    // Set up update input form
    this.$('.author').html('<input type="text" class="author-update" value="' + author + '"">');
    this.$('.title').html('<input type="text" class="title-update" value="' + title + '"">');
    this.$('.url').html('<input type="text" class="url-update" value="' + url + '"">');
  },
  update: function(){
    // Set new values for the model connected to this View
    this.model.set('author', $('.author-update').val());
    this.model.set('title', $('.title-update').val());
    this.model.set('url', $('.url-update').val());
  },
  render: function(){
    // On render, set the $el html to our template filled with the associated model's data
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// View for all blogs //
var BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function(){
    var self = this;
    // Listen for changes to collection
    this.model.on('add', this.render, this);
    this.model.on('change', function(){
      setTimeout(function(){
        self.render();
      }, 50);
    });
  },
  render: function(){
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(blog){
      self.$el.append((new BlogView({model: blog})).render().$el);
    });
    return this;
  }
});

// Blog list Backbone View instance
var blogsView = new BlogsView();

$(document).ready(function(){
  var $authorInput = $('.author-input'),
      $titleInput = $('.title-input'),
      $urlInput = $('.url-input');

  $('.add-blog').on('click', function(){
    var blog = new Blog({
      author: $authorInput.val(),
      title: $titleInput.val(),
      url: $urlInput.val()
    });
    blogs.add(blog);

    $authorInput.val('');
    $titleInput.val('');
    $urlInput.val('');
  });
});
