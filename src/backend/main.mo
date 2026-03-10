import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";



actor {
  type Pooja = {
    poojaId : Nat;
    nameEnglish : Text;
    nameMalayalam : Text;
    descriptionEnglish : Text;
    descriptionMalayalam : Text;
    timing : Text;
    fee : Nat;
    availableDays : [Text];
  };

  module Pooja {
    public func compare(pooja1 : Pooja, pooja2 : Pooja) : Order.Order {
      if (pooja1.poojaId < pooja2.poojaId) { #less } else if (pooja1.poojaId > pooja2.poojaId) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  type Booking = {
    bookingId : Nat;
    devoteeName : Text;
    phoneNumber : Text;
    poojaId : Nat;
    preferredDate : Text;
    status : Text;
    createdTimestamp : Time.Time;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      if (booking1.bookingId < booking2.bookingId) { #less } else if (booking1.bookingId > booking2.bookingId) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  type User = {
    phoneNumber : Text;
    name : Text;
    registeredAt : Time.Time;
  };

  type OTPRecord = {
    otp : Text;
    name : Text;
    createdAt : Time.Time;
  };

  type Notification = {
    id : Nat;
    message : Text;
    timestamp : Time.Time;
  };

  type Token = {
    tokenNumber : Nat;
    name : Text;
    phoneNumber : Text;
    bookedAt : Time.Time;
  };

  var nextBookingId = 1;
  var nextNotificationId = 1;
  var nextTokenNumber = 101;
  let poojas = Map.empty<Nat, Pooja>();
  let bookings = Map.empty<Nat, Booking>();
  let users = Map.empty<Text, User>();
  let pendingOTPs = Map.empty<Text, OTPRecord>();
  let notifications = Map.empty<Nat, Notification>();
  let notificationPreferences = Map.empty<Text, Bool>();
  let tokens = Map.empty<Nat, Token>();

  // Generate a 6-digit OTP from current time
  func generateOTP(_phone : Text) : Text {
    let t : Int = Time.now();
    let raw : Nat = Int.abs(t / 1_000_000) % 900_000;
    let sixDigit : Nat = raw + 100_000;
    sixDigit.toText();
  };

  // Pre-seed poojas
  let initialPoojas = [
    {
      poojaId = 2;
      nameEnglish = "Ashtabandha Kalasham";
      nameMalayalam = "അഷ്ടബന്ധ കലശം";
      descriptionEnglish = "A special ritual for installing deities.";
      descriptionMalayalam = "പ്രതിഷ്ഠ ദേവതകൾക്ക് വേണ്ടി നടത്തുന്ന ഒരു പ്രത്യേക പൂജ.";
      timing = "By appointment";
      fee = 10000;
      availableDays = ["Monday", "Thursday"];
    },
    {
      poojaId = 3;
      nameEnglish = "Udayasthamana Pooja";
      nameMalayalam = "ഉദ്യാസ്ഥമാന പൂജ";
      descriptionEnglish = "Continuous worship from sunrise to sunset.";
      descriptionMalayalam = "സൂര്യോദയത്തിൽ നിന്ന് സൂര്യാസ്ഥമനം വരെ തുടർച്ചയായ പൂജ.";
      timing = "6:00 AM - 6:00 PM";
      fee = 5000;
      availableDays = ["Wednesday", "Saturday"];
    },
    {
      poojaId = 4;
      nameEnglish = "Sahasranama Archana";
      nameMalayalam = "സഹസ്രനാമ അർച്ചന";
      descriptionEnglish = "Recitation of 1000 holy names of the deity.";
      descriptionMalayalam = "ദേവതയുടെ ആയിരം പുണ്യനാമങ്ങൾ പാരായണം.";
      timing = "6:30 AM, 4:00 PM";
      fee = 1000;
      availableDays = ["All Days"];
    },
    {
      poojaId = 5;
      nameEnglish = "Palabhishekam";
      nameMalayalam = "പലാഭിഷേകം";
      descriptionEnglish = "Offering of milk to the deity.";
      descriptionMalayalam = "ദേവതയ്ക്ക് പാൽ അഭിഷേകം.";
      timing = "Morning only";
      fee = 1500;
      availableDays = ["Friday"];
    },
    {
      poojaId = 6;
      nameEnglish = "Pushpanjali";
      nameMalayalam = "പുഷ്പാഞ്ജലി";
      descriptionEnglish = "Offering of flowers to the deity.";
      descriptionMalayalam = "ദേവതയ്ക്ക് പൂവുകൾ അർപ്പിക്കുന്നു.";
      timing = "All Pooja Timings";
      fee = 500;
      availableDays = ["All Days"];
    }
  ];

  initialPoojas.forEach(
    func(p) {
      poojas.add(p.poojaId, p);
    }
  );

  public query ({ caller }) func getAllPoojas() : async [Pooja] {
    poojas.values().toArray().sort();
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray().sort();
  };

  public shared ({ caller }) func submitBooking(devoteeName : Text, phoneNumber : Text, poojaId : Nat, preferredDate : Text) : async Nat {
    if (not poojas.containsKey(poojaId)) { Runtime.trap("Pooja does not exist") };
    let booking : Booking = {
      bookingId = nextBookingId;
      devoteeName;
      phoneNumber;
      poojaId;
      preferredDate;
      status = "pending";
      createdTimestamp = Time.now();
    };
    bookings.add(nextBookingId, booking);
    nextBookingId += 1;
    booking.bookingId;
  };

  public shared ({ caller }) func updateBookingStatus(bookingId : Nat, newStatus : Text) : async () {
    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let updatedBooking = { booking with status = newStatus };
        bookings.add(bookingId, updatedBooking);
      };
    };
  };

  // Token Booking
  public shared func bookToken(name : Text, phoneNumber : Text) : async Nat {
    let tokenNum = nextTokenNumber;
    let token : Token = {
      tokenNumber = tokenNum;
      name;
      phoneNumber;
      bookedAt = Time.now();
    };
    tokens.add(tokenNum, token);
    nextTokenNumber += 1;
    tokenNum;
  };

  public query func getAllTokens() : async [Token] {
    tokens.toArray().map(func((_, t)) { t });
  };

  public query func getTokenByPhone(phoneNumber : Text) : async ?Token {
    let found = tokens.toArray().filter(func((_, t)) { t.phoneNumber == phoneNumber });
    if (found.size() == 0) { null } else { ?(found[found.size() - 1].1) };
  };

  // Registration: request OTP
  public shared func requestOTP(phoneNumber : Text, name : Text) : async Text {
    if (users.containsKey(phoneNumber)) {
      Runtime.trap("Phone number already registered");
    };
    let otp = generateOTP(phoneNumber);
    let record : OTPRecord = {
      otp;
      name;
      createdAt = Time.now();
    };
    pendingOTPs.add(phoneNumber, record);
    otp;
  };

  public shared func verifyOTP(phoneNumber : Text, otp : Text) : async Bool {
    switch (pendingOTPs.get(phoneNumber)) {
      case (null) { false };
      case (?record) {
        if (record.otp == otp) {
          let elapsed : Int = Time.now() - record.createdAt;
          if (elapsed <= 10 * 60 * 1_000_000_000) {
            let user : User = {
              phoneNumber;
              name = record.name;
              registeredAt = Time.now();
            };
            users.add(phoneNumber, user);
            pendingOTPs.remove(phoneNumber);
            true;
          } else {
            pendingOTPs.remove(phoneNumber);
            false;
          };
        } else {
          false;
        };
      };
    };
  };

  public query func isRegistered(phoneNumber : Text) : async Bool {
    users.containsKey(phoneNumber);
  };

  public query func getUser(phoneNumber : Text) : async ?User {
    users.get(phoneNumber);
  };

  public shared ({ caller }) func setNotificationPreference(phoneNumber : Text, enabled : Bool) : async () {
    notificationPreferences.add(phoneNumber, enabled);
  };

  public query ({ caller }) func getUserNotificationPreference(phoneNumber : Text) : async Bool {
    switch (notificationPreferences.get(phoneNumber)) {
      case (null) { true };
      case (?enabled) { enabled };
    };
  };

  public query ({ caller }) func getOptedInUsers() : async [Text] {
    notificationPreferences.toArray().filter(
      func((_, enabled)) { enabled }
    ).map(func((phone, _)) { phone });
  };

  public shared ({ caller }) func publishNotification(message : Text, adminPassword : Text) : async Bool {
    if (adminPassword != "temple2026") {
      Runtime.trap("Invalid admin password");
    };
    let notification : Notification = {
      id = nextNotificationId;
      message;
      timestamp = Time.now();
    };
    notifications.add(nextNotificationId, notification);
    nextNotificationId += 1;
    true;
  };

  public query ({ caller }) func getNotifications() : async [Notification] {
    let notificationsArray = notifications.toArray().map(
      func((_, notification)) { notification }
    );
    notificationsArray.sort(
      func(a, b) {
        if (a.timestamp > b.timestamp) {
          #less;
        } else if (a.timestamp < b.timestamp) {
          #greater;
        } else {
          #equal;
        };
      }
    );
  };
};
