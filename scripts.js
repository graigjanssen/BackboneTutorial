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

// One blog list item //
// Represents a blog model in the browser, listens for input from user, makes changes to the model and reflects them //
var BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function(){
    // On creation of new BlogView, set template to the Underscore template in index.html
    this.template = _.template($('.blogs-list-template').html());
  },
  events: {  // Notice syntax 'event .class-name': 'function name' //
    'click .edit-blog': 'edit',
    'click .update-blog': 'update',
    'click .cancel': 'cancel',
    'click .delete-blog': 'delete'
  },
  edit: function(){ // Isn't the following a bit tedious and cumbersome? //
    // Update buttons for updating entry (only the one that was clicked)
    this.$('.edit-blog').hide();
    this.$('.delete-blog').hide();
    this.$('.update-blog').show();
    this.$('.cancel').show();

    // Store values from this item's <span>s for use in update form
    var author = this.$('.author').html();
    var title = this.$('.title').html();
    var url = this.$('.url').html();

    // Set up update input form (speaking of cumbersome) //
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
  cancel: function(){
    // 'Refreshes' to return to regular list //
    blogsView.render();
  },
  delete: function(){
    this.model.destroy(); // ouch! poor model :( //
  },
  render: function(){
    // On render, set the $el html to our template filled with the associated model's data
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// List of all blogs //
var BlogsView = Backbone.View.extend({
  model: blogs, // the collection
  el: $('.blogs-list'),
  initialize: function(){
    var self = this;
    // Listen for changes to collection
    this.model.on('add', this.render, this);
    this.model.on('change', function(){
      // Needed for proper updating //
      setTimeout(function(){
        self.render();
      }, 50);
    });
    this.model.on('remove', this.render, this);
  },
  render: function(){
    var self = this;
    this.$el.html(''); // Empty the list
    // For each blog in the collection... //
    _.each(this.model.toArray(), function(blog){
      // Add to single blogView to this collection instance
      self.$el.append((new BlogView({model: blog})).render().$el);
    });
    return this;
  }
});

// Blog list Backbone View instance
var blogsView = new BlogsView();

$(document).ready(function(){
  // Storing add blog inputs //
  var $authorInput = $('.author-input'),
      $titleInput = $('.title-input'),
      $urlInput = $('.url-input');
  // When add blog is clicked ... //
  $('.add-blog').on('click', function(){
    // Create new instance of model with values from fields //
    var blog = new Blog({
      author: $authorInput.val(),
      title: $titleInput.val(),
      url: $urlInput.val()
    });
    // Add model to collection
    blogs.add(blog);

    // Clear fields //
    $authorInput.val('');
    $titleInput.val('');
    $urlInput.val('');
  });
});
