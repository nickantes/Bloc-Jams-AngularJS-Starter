(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /**
     * @desc Assign the Fixtures' albumPicasso Object to currentAlbum
     * @type {Object}
     */
    var currentAlbum = Fixtures.getAlbum();

    /**
     * @desc Album index number of current song
     * @type {Number}
     * @param {Object} song
     */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
     * @desc Active song object from list of songs
     * @type {Object}
     */
    SongPlayer.currentSong = null;

    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;

    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };
    /**
     * @function playSong
     * @desc Starts playing the currently selected song and sets the song.playing boolean value
     * @param {Object} song
     */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
     * @function SongPlayer.play
     * @desc Checks to see if the song clicked was already the selected song and, if not,
     * sets the clicked song as the current song & plays it or, if paused,
     * resumes playing.
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };

    /**
     * @function SongPlayer.pause
     * @desc Pauses the currently playing song and clears the song.playing boolean value
     * @param {Object} song
     */

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
     * @function SongPlayer.previous
     * @desc Changes the current song to the one before it in the album order
     */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };


    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();