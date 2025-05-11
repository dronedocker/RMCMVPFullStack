// Router route names
export enum ERouterName {
    ELEMENT = 'element',
    PROJECT = 'project',
    HOME = 'home',
    TSA = 'tsa',
    LAYER = 'layer',
    MEDIA = 'media',
    WAYLINE = 'wayline',
    LIVESTREAM = 'livestream',
    LIVING = 'living',
    WORKSPACE = 'workspace',
    MEMBERS = 'members',
    DEVICES = 'devices',
    TASK = 'task',
    CREATE_PLAN = 'create-plan',
    SELECT_PLAN = 'select-plan',
    FIRMWARES = 'firmwares',
    FLIGHT_AREA = 'flight-area',

    PILOT = 'pilot-login',
    PILOT_HOME = 'pilot-home',
    PILOT_MEDIA = 'pilot-media',
    PILOT_LIVESHARE = 'pilot-liveshare',
    PILOT_BIND = 'pilot-bind',
  }

// Storage key names
export enum EStorageKey {
    LANG_CODE = 'DJI_CREATE_VITE_H5_APP:lang_code',
    TEST_TOOLS_POSITION_STORAGE_KEY = 'DJI_CREATE_VITE_H5_APP:test_tools_position',
    SESSION_ID = 'DJI_CREATE_VITE_H5_APP:sess',
  }

// Device status values
export enum EStatusValue {
    CONNECTED = 'Connected',
    DISCONNECT = 'Disconnect',
    LIVING = 'Living',
  }

// Stream connection statuses
export enum ELiveStatusValue {
    DISCONNECT,
    CONNECTED,
    LIVING,
  }

// Component identifiers
export enum EComponentName {
    Thing = 'thing',
    Liveshare = 'liveshare',
    Api = 'api',
    Ws = 'ws',
    Map = 'map',
    Tsa = 'tsa',
    Media = 'media',
    Mission = 'mission',
  }

// Keys used in localStorage
export enum ELocalStorageKey {
    Username = 'username',
    WorkspaceId = 'workspace_id',
    Token = 'x-auth-token',
    PlatformName = 'platform_name',
    WorkspaceName = 'workspace_name',
    WorkspaceDesc = 'workspace_desc',
    Flag = 'flag',
    UserId = 'user_id',
    Device = 'device',
    GatewayOnline = 'gateway_online',
  }

// Photo types used in media handling
export enum EPhotoType {
    Original = 0,
    Preview = 1,
    Unknown = -1,
  }

// Download ownership status
export enum EDownloadOwner {
    Mine = 0,
    Others = 1,
    Unknown = -1,
  }

// User type for access control
export enum EUserType {
    Web = 1,
    Pilot = 2,
  }

// Event bus / API message types
export enum EBizCode {
    GatewayOsd = 'gateway_osd',
    DeviceOsd = 'device_osd',
    DockOsd = 'dock_osd',

    MapElementCreate = 'map_element_create',
    MapElementUpdate = 'map_element_update',
    MapElementDelete = 'map_element_delete',

    DeviceOnline = 'device_online',
    DeviceOffline = 'device_offline',
    DeviceHms = 'device_hms',

    FlightTaskProgress = 'flighttask_progress',
    FlightTaskMediaProgress = 'file_upload_callback',
    FlightTaskMediaHighestPriority = 'highest_priority_upload_flighttask_media',

    DeviceReboot = 'device_reboot',
    DroneOpen = 'drone_open',
    DroneClose = 'drone_close',
    DeviceFormat = 'device_format',
    DroneFormat = 'drone_format',
    CoverOpen = 'cover_open',
    CoverClose = 'cover_close',
    PutterOpen = 'putter_open',
    PutterClose = 'putter_close',
    ChargeOpen = 'charge_open',
    ChargeClose = 'charge_close',

    DeviceUpgrade = 'ota_progress',
    DeviceLogUploadProgress = 'fileupload_progress',

    ControlSourceChange = 'control_source_change',
    FlyToPointProgress = 'fly_to_point_progress',
    TakeoffToPointProgress = 'takeoff_to_point_progress',
    JoystickInvalidNotify = 'joystick_invalid_notify',
    DrcStatusNotify = 'drc_status_notify',

    FlightAreasSyncProgress = 'flight_areas_sync_progress',
    FlightAreasDroneLocation = 'flight_areas_drone_location',
    FlightAreasUpdate = 'flight_areas_update',
  }

// Device type mapping
export enum EDeviceTypeName {
    Aircraft = 0,
    Gateway = 2,
    Dock = 3,
  }

// Hardware message severity levels
export enum EHmsLevel {
    NOTICE,
    CAUTION,
    WARN,
  }
